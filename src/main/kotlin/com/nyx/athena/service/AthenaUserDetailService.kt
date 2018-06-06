package com.nyx.athena.service

import com.nyx.athena.model.AthenaUser
import com.nyx.athena.repository.AthenaUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.io.Serializable
import javax.transaction.Transactional

@Service
@Transactional
class AthenaUserDetailService : UserDetailsService {
    @Autowired
    private lateinit var repositoryAthena: AthenaUserRepository

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        @SuppressWarnings
        val athenaUser: AthenaUser = repositoryAthena.findByUsername(username) ?: throw UsernameNotFoundException("User $username not found")
        val authorities = athenaUser.roles
                .fold(ArrayList<String>(), { accumulator, item -> accumulator.add(item.authority); accumulator })
                .toTypedArray()
        return User(username,
                athenaUser.password,
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
