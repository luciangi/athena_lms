package com.nyx.athena.repository

import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.Role
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException

import static com.nyx.athena.model.Role.Authority.ROLE_STUDENT

class RoleRepositoryTest extends BaseIntegrationTest {
    @Autowired
    private RoleRepository roleRepository

    def "test save"() {
        when: "A new role is saved"
        roleRepository.save(new Role(ROLE_STUDENT.name()))

        then: "The role is present in the repository"
        roleRepository.findAll().size() == 1
    }

    def "test authority unique constraint"() {
        when: "Trying to save 2 roles with the same authority"
        roleRepository.save(new Role(ROLE_STUDENT.name()))
        roleRepository.save(new Role(ROLE_STUDENT.name()))

        then: "The authority unique constraint is thrown"
        thrown(DataIntegrityViolationException)
        roleRepository.findAll().size() == 1
    }
}
