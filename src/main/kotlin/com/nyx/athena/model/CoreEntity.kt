package com.nyx.athena.model

import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import java.util.*
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@TypeDef(name = "uuid-custom", typeClass = UuidCustomType::class)
@MappedSuperclass
open class CoreEntity {
    @Id
    @Type(type = "uuid-custom")
    val id: UUID = UUID.randomUUID()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CoreEntity

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}
