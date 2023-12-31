package com.nyx.athena

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import springfox.documentation.swagger2.annotations.EnableSwagger2

@SpringBootApplication
@EnableSwagger2
class AthenaApplication

fun main(args: Array<String>) {
    SpringApplication.run(AthenaApplication::class.java, *args)
}
