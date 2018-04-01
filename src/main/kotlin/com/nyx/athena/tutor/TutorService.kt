package com.nyx.athena.tutor

import com.nyx.athena.security.model.Role
import com.nyx.athena.security.repository.RoleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional
@Service
open class TutorService(@Autowired
                        private var roleRepository: RoleRepository,
                        @Autowired
                        private var repository: TutorRepository,
                        @Autowired
                        private var passwordEncoder: PasswordEncoder) {
    fun registerTutor() {
        val tutorUser = Tutor(
                "tutor",
                passwordEncoder.encode("tutor"),
                "tutor@email.com",
                "Demo",
                "Tutor")
        tutorUser.roles += roleRepository.findByAuthority(Role.Authority.ROLE_TUTOR.name)
        repository.save(tutorUser)
    }
}
