package com.nyx.athena.service

import com.nyx.athena.model.AthenaUser
import com.nyx.athena.model.Role
import com.nyx.athena.repository.AthenaUserRepository
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import spock.lang.Ignore
import spock.lang.Specification

import static com.nyx.athena.model.Role.Authority.ROLE_ADMIN

class AthenaUserDetailServiceTest extends Specification {
    private AthenaUserRepository athenaUserRepository = Mock(AthenaUserRepository)

    private AthenaUserDetailService athenaUserDetailService = new AthenaUserDetailService(repositoryAthena: athenaUserRepository)

    def "test loadUserByUsername"() {
        given:
        String username = "ADMIN"
        String password = "PASSWORD"
        athenaUserRepository.findByUsername(username) >> new AthenaUser(
                username: username,
                password: password,
                roles: [new Role(ROLE_ADMIN.name())]
        )

        when: "Calling the loadUserByUsername method"
        UserDetails user = athenaUserDetailService.loadUserByUsername(username)

        then: "The spring security user returned has the correct values"
        user != null
        with(user) {
            username == username
            password == password
            authorities.size() == 1
            authorities[0].authority == ROLE_ADMIN.name()
        }
    }

    def "test userDetail for no user authenticated"() {
        given: "An guest user (not an authenticated user)"
        SecurityContextHolder.getContext().setAuthentication(
                new AnonymousAuthenticationToken("GUEST", "USERNAME", AuthorityUtils.createAuthorityList("GUEST")))

        when: "Calling the userDetail method"
        Map detail = athenaUserDetailService.userDetail()

        then: "The method returns null"
        detail == null
    }

    @Ignore
    def "test userDetail for a user authenticated"() {
        given: "An authenticated user"
        String username = "ADMIN"
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(username, "PASSWORD", AuthorityUtils.createAuthorityList(ROLE_ADMIN.name())))

        when: "Calling userDetail method"
        Map detail = athenaUserDetailService.userDetail()

        then: "The user detail is correct"
        detail != null
        with(detail) {
            username == username
            roles == [ROLE_ADMIN.name()]
        }
    }
}
