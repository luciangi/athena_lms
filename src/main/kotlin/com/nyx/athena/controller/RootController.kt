package com.nyx.athena.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
@Suppress("unused")
class RootController {
    @GetMapping("/{[path:[^\\.]*}")
    fun index(): String = "forward:/"

    @GetMapping("/genericError")
    fun genericError(): String = "forward:/"
}
