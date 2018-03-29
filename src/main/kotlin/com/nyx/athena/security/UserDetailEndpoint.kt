package com.nyx.athena.security

import com.nyx.athena.API_ENDPOINT_PREFIX
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(API_ENDPOINT_PREFIX)
class UserDetailEndpoint {
    @Autowired
    lateinit var userDetailService: UserDetailService

    @GetMapping("/user")
    fun user(): Map<String, Any> {
        return userDetailService.loadUserResponse()
    }
}
