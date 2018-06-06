package com.nyx.athena.service

import com.nyx.athena.model.AthenaUser
import com.nyx.athena.model.Role
import com.nyx.athena.repository.AthenaUserRepository
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
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

        when:
        UserDetails user = athenaUserDetailService.loadUserByUsername(username)

        then:
        user != null
        user.username == username
        user.password == password
        user.authorities.size() == 1
        user.authorities[0].authority == ROLE_ADMIN.name()
    }

    def "test userDetail for no user authenticated"() {
        given:
        SecurityContextHolder.getContext().setAuthentication(
                new AnonymousAuthenticationToken("GUEST", "USERNAME", AuthorityUtils.createAuthorityList("GUEST")))

        when:
        Map detail = athenaUserDetailService.userDetail()

        then:
        detail == null
    }

    def "test userDetail for a user authenticated"() {
        given:
        String username = "ADMIN"
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(username, "PASSWORD", AuthorityUtils.createAuthorityList(ROLE_ADMIN.name())))

        when:
        Map detail = athenaUserDetailService.userDetail()

        then:
        detail != null
        detail.username == username
        detail.roles == [ROLE_ADMIN.name()]
    }
}
