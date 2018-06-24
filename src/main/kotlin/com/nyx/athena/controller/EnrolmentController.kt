package com.nyx.athena.controller

import com.nyx.athena.model.Enrolment
import com.nyx.athena.service.EnrolmentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api")
class EnrolmentController {
    @Autowired
    private lateinit var enrolmentService: EnrolmentService

    @GetMapping("/enrolment")
    fun getEnrolments(@RequestParam page: Int,
                      @RequestParam size: Int,
                      @RequestParam sort: String
    ): Map<String, Any> {
        val enrolmentPage: Page<Enrolment> = enrolmentService.findAll(PageRequest(page, size))
        return hashMapOf(
                "content" to enrolmentPage.content.map {
                    hashMapOf(
                            "id" to it.id,
                            "course" to it.course.name,
                            "studentFirstName" to it.student.firstName,
                            "studentLastName" to it.student.lastName,
                            "enrolmentDate" to it.enrolmentDate,
                            "completionDate" to it.completionDate
                    )
                },
                "page" to hashMapOf(
                        "number" to enrolmentPage.number,
                        "size" to size,
                        "totalElements" to enrolmentPage.totalElements,
                        "totalPages" to enrolmentPage.totalPages
                )
        )
    }

    @PostMapping("/enrolment/enrol/{courseId}")
    fun enrol(@PathVariable courseId: UUID) {
        enrolmentService.enrol(courseId)
    }
}
