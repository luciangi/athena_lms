package com.nyx.athena.controller

import com.nyx.athena.service.UserDetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
@Suppress("unused")
class UserDetailController {
    @Autowired
    private lateinit var userDetailService: UserDetailService

    @GetMapping("/userDetails")
    fun userDetail(): Map<String, Any> {
        return userDetailService.userDetail()
    }
}
