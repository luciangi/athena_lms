package com.nyx.athena.security

import com.nyx.athena.security.model.User
import com.nyx.athena.security.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
@org.springframework.transaction.annotation.Transactional
open class UserDetailService : UserDetailsService {
    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    @Autowired
    private lateinit var repository: UserRepository

    fun registerUser(user: User) {
        user.password = passwordEncoder.encode(user.password)
        repository.save(user)
    }

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = repository.findByUsername(username) ?: throw UsernameNotFoundException("User $username not found")
        val authorities = user.roles
                .fold(ArrayList<String>(), { accumulator, item -> accumulator.add(item.authority); accumulator })
                .toTypedArray()
        return org.springframework.security.core.userdetails.User(username,
                user.password,
                AuthorityUtils.createAuthorityList(*authorities))
    }

    fun loadUserResponse(): Map<String, Any> {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication
        return hashMapOf("username" to authentication.name,
                "roles" to authentication.authorities.fold(ArrayList<String>(), { accumulator, item -> accumulator.add(item.authority); accumulator }))
    }
}
