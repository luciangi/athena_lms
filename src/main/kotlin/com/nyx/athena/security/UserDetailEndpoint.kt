package com.nyx.athena.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserDetailEndpoint {
    @Autowired
    lateinit var userDetailService: UserDetailService

    @GetMapping("/user")
    fun user(): Map<String, Any> {
        return userDetailService.loadUserResponse()
    }
}
