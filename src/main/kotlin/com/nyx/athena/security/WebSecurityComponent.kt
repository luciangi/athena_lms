package com.nyx.athena.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.stereotype.Component
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
                .antMatchers("/",
                        "/build/**",
                        "/swagger-resources/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login")
                .failureHandler(SimpleUrlAuthenticationFailureHandler())
                .defaultSuccessUrl("/").permitAll()
                .and()
                .httpBasic().and().csrf().disable()
                .logout().logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .and()
                .exceptionHandling().authenticationEntryPoint(Http403ForbiddenEntryPoint())
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
