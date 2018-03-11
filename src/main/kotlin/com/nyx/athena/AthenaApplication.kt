package com.nyx.athena

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class AthenaApplication

fun main(args: Array<String>) {
    SpringApplication.run(AthenaApplication::class.java, *args)
}
