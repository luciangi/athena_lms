package com.nyx.athena.service

import com.nyx.athena.repository.AthenaUserRepository
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import spock.lang.Specification

class AthenaUserDetailServiceTest extends Specification {
    AthenaUserDetailService athenaUserDetailService = new AthenaUserDetailService(
            repositoryAthena: Mock(AthenaUserRepository)
    )

    def "test loadUserByUsername"() {
    }

    def "test userDetail for no user authenticated"() {
        setup:
        SecurityContextHolder.getContext().setAuthentication(
                new AnonymousAuthenticationToken("GUEST", "USERNAME", AuthorityUtils.createAuthorityList("ROLE_ONE")))

        when:
        Map detail = athenaUserDetailService.userDetail()

        then:
        detail == null
    }

    def "test userDetail for a user authenticated"() {
        when:
        Map detail = athenaUserDetailService.userDetail()

        then:
        detail != null
    }
}
