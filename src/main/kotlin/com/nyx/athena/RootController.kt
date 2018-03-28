package com.nyx.athena

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {
    @GetMapping(value = ["/", "/home/**", "/admin/**", "/tutor/**", "/student/**"])
    fun index(): String = "build/index.html"
}
