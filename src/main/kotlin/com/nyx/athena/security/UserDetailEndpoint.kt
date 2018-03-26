package com.nyx.athena.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserDetailEndpoint {
    @GetMapping("/user")
    fun user(): Map<String, Any> {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication
        return hashMapOf("username" to authentication.name,
                "roles" to authentication.authorities.fold(ArrayList<String>(), { accumulator, item -> accumulator.add(item.authority); accumulator }))
    }
}
