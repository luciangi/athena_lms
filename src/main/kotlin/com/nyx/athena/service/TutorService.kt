package com.nyx.athena.service

import com.nyx.athena.model.Role
import com.nyx.athena.model.Tutor
import com.nyx.athena.repository.RoleRepository
import com.nyx.athena.repository.TutorRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class TutorService {
    @Autowired
    private lateinit var repository: TutorRepository
    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder
    @Autowired
    private lateinit var roleRepository: RoleRepository

    fun register(username: String,
                 password: String,
                 email: String,
                 firstName: String,
                 lastName: String): Tutor {
        val tutor = Tutor(
                username,
                passwordEncoder.encode(password),
                email,
                firstName,
                lastName
        )
        tutor.roles += roleRepository.findByAuthority(Role.Authority.ROLE_TUTOR.name)
        return repository.save(tutor)
    }
}
