package com.nyx.athena.controller

import com.nyx.athena.model.Tutor
import com.nyx.athena.service.TutorService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/api/tutor")
@Suppress("unused")
class TutorController {
    @Autowired
    private lateinit var tutorService: TutorService

    @PostMapping("register")
    fun register(username: String,
                 password: String,
                 email: String,
                 firstName: String,
                 lastName: String): Tutor = tutorService.register(username, password, email, firstName, lastName)
}
