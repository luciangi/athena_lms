package com.nyx.athena.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import com.nyx.athena.service.AthenaUserDetailService
import org.springframework.beans.factory.annotation.Autowired
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
class WebSecurityComponent : WebSecurityConfigurerAdapter() {
    @Autowired
    private lateinit var dataSource: DataSource

    @Autowired
    private lateinit var athenaUserDetailService: AthenaUserDetailService

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
                        "/api/courses/all",
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
                        "/courses/**",
                        "/api/students"
                ).hasRole("TUTOR")
                .antMatchers(
                        HttpMethod.GET,
                        "/student/**",
                        "/enrolments/**"
                ).hasRole("STUDENT")
                .antMatchers(
                        HttpMethod.GET,
                        "/subjects/**"
                ).hasAnyRole("TUTOR", "ADMIN")
                .antMatchers(
                        HttpMethod.GET,
                        "/api/subjects"
                ).authenticated()
                .antMatchers(
                        HttpMethod.GET,
                        "/assignments/**"
                ).hasAnyRole("TUTOR", "STUDENT")
                .antMatchers("/api/**")
                .hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/api/login")
                .failureHandler({ _, response: HttpServletResponse, _ ->
                    response.sendError(SC_UNAUTHORIZED, "Bad credentials")
                })
                .successHandler({ _, response: HttpServletResponse, _ ->
                    response.contentType = APPLICATION_JSON_VALUE
                    val out = response.writer
                    out.print(ObjectMapper().writeValueAsString(athenaUserDetailService.userDetail()))
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
                .userDetailsService(athenaUserDetailService)
    }

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        val queryUsersByUsername = """SELECT username,
                                             password,
                                             active
                                      FROM "athena_user"
                                      WHERE username=?"""
                .trimIndent()
        val authoritiesByUsernameQuery = """SELECT u.username,
                                                   r.authority
                                            FROM "athena_user" u
                                            INNER JOIN athena_user_roles ur
                                             ON(u.id=ur.athena_user_id)
                                            INNER JOIN role r
                                             ON(ur.roles_id=r.id) WHERE u.username=?"""
                .trimIndent()
        auth.jdbcAuthentication()
                .usersByUsernameQuery(queryUsersByUsername)
                .authoritiesByUsernameQuery(authoritiesByUsernameQuery)
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder)
    }
}
