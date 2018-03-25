package com.nyx.athena.security.service

import com.nyx.athena.security.model.User
import com.nyx.athena.security.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService {
    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    fun registerUser(user: User) {
        user.password = passwordEncoder.encode(user.password)
        userRepository.save(user)
    }
}
