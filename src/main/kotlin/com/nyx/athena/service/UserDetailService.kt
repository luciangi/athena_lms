package com.nyx.athena.service

import com.nyx.athena.model.User
import com.nyx.athena.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.io.Serializable

@Service
@Transactional
open class UserDetailService : UserDetailsService {
    @Autowired
    private lateinit var repository: UserRepository

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        @SuppressWarnings
        val user: User = repository.findByUsername(username) ?: throw UsernameNotFoundException("User $username not found")
        val authorities = user.roles
                .fold(ArrayList<String>(), { accumulator, item -> accumulator.add(item.authority); accumulator })
                .toTypedArray()
        return org.springframework.security.core.userdetails.User(username,
                user.password,
                AuthorityUtils.createAuthorityList(*authorities))
    }

    fun userDetail(): Map<String, Serializable>? {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication
        if (authentication !is AnonymousAuthenticationToken) {
            return hashMapOf("username" to authentication.name,
                    "roles" to authentication.authorities.fold(ArrayList<String>(), { accumulator, item -> accumulator.add(item.authority); accumulator }))
        }
        return null
    }
}
