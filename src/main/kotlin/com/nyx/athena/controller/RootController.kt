package com.nyx.athena.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
@Suppress("unused")
class RootController {
    @GetMapping(value = ["/", "/home/**", "/admin/**", "/tutor/**", "/student/**"])
    fun index(): String = "index.html"
}
