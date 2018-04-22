package com.nyx.athena.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import com.nyx.athena.service.UserDetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED
import javax.sql.DataSource

@Component
open class WebSecurityComponent : WebSecurityConfigurerAdapter() {
    @Autowired
    @Qualifier("dataSource")
    private lateinit var dataSource: DataSource

    @Autowired
    private lateinit var userDetailService: UserDetailService

    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.authorizeRequests()
                .antMatchers(
                        HttpMethod.GET,
                        "/*.js",
                        "/*.html",
                        "/*.css",
                        "/images/**",
                        "/",
                        "/api/userDetails",
                        "/genericError",
                        "/swagger-resources/**"
                ).permitAll()
                .antMatchers(
                        HttpMethod.GET,
                        "/admin/**",
                        "/tutors/**",
                        "/students/**"
                ).hasRole("ADMIN")
                .antMatchers(
                        HttpMethod.GET,
                        "/tutor/**",
                        "/courses/**"
                ).hasRole("TUTOR")
                .antMatchers(
                        HttpMethod.GET,
                        "/student/**",
                        "/enrolments/**"
                ).hasRole("STUDENT")
                .antMatchers(
                        HttpMethod.GET,
                        "/subjects/**",
                        "/api/subjects"
                ).hasAnyRole("TUTOR", "ADMIN")
                .antMatchers(
                        HttpMethod.GET,
                        "/assignments/**"
                ).hasAnyRole("TUTOR", "STUDENT")
                .antMatchers("/api/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/api/login")
                .failureHandler({ _, response: HttpServletResponse, _ ->
                    response.sendError(SC_UNAUTHORIZED, "Bad credentials")
                })
                .successHandler({ _, response: HttpServletResponse, _ ->
                    response.contentType = APPLICATION_JSON_VALUE
                    val out = response.writer
                    out.print(ObjectMapper().writeValueAsString(userDetailService.userDetail()))
                    out.flush()
                }).permitAll()
                .and()
                .httpBasic().and().csrf().disable()
                .logout().logoutUrl("/api/logout").logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint({ _: HttpServletRequest, response: HttpServletResponse, _: AuthenticationException ->
                    response.sendRedirect("/genericError?error=401")
                })
                .accessDeniedHandler({ _: HttpServletRequest, response: HttpServletResponse, _: AccessDeniedException ->
                    response.sendRedirect("/genericError?error=403")
                })
                .and()
                .userDetailsService(userDetailService)
    }

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        val queryUsersByUsername = "SELECT username, password, active FROM \"user\" WHERE username=?"
        val authoritiesByUsernameQuery = "SELECT u.username, r.authority FROM \"user\" u INNER JOIN user_roles ur ON(u.id=ur.user_id) INNER JOIN role r ON(ur.roles_id=r.id) WHERE u.username=?"
        auth.jdbcAuthentication()
                .usersByUsernameQuery(queryUsersByUsername)
                .authoritiesByUsernameQuery(authoritiesByUsernameQuery)
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder)
    }
}
