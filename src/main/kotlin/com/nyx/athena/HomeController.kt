package com.nyx.athena

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class HomeController {
    @RequestMapping("/")
    fun index(): String = "build/index.html"
}
