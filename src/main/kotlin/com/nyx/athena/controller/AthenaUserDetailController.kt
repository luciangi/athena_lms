package com.nyx.athena.controller

import com.nyx.athena.service.AthenaUserDetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
@Suppress("unused")
class AthenaUserDetailController {
    @Autowired
    private lateinit var athenaUserDetailService: AthenaUserDetailService

    @GetMapping("/userDetails")
    fun userDetail(): Map<String, Any>? {
        return athenaUserDetailService.userDetail()
    }
}
