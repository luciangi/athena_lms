package com.nyx.athena.model

import org.hibernate.type.AbstractSingleColumnStandardBasicType
import org.hibernate.type.PostgresUUIDType
import org.hibernate.type.descriptor.java.JavaTypeDescriptor
import org.hibernate.type.descriptor.java.UUIDTypeDescriptor
import org.hibernate.type.descriptor.sql.SqlTypeDescriptor
import org.hibernate.type.descriptor.sql.VarcharTypeDescriptor
import java.io.IOException
import java.util.*

class UUIDCustomType : AbstractSingleColumnStandardBasicType<UUID>(SQL_DESCRIPTOR, TYPE_DESCRIPTOR) {
    override fun getName(): String {
        return "uuid-custom"
    }

    companion object {

        private const val serialVersionUID = 902830399800029445L

        private val SQL_DESCRIPTOR: SqlTypeDescriptor
        private val TYPE_DESCRIPTOR: JavaTypeDescriptor<UUID>

        init {
            val properties = Properties()
            try {
                val loader = Thread.currentThread().contextClassLoader
                properties.load(loader.getResourceAsStream("application.properties"))
            } catch (e: IOException) {
                throw RuntimeException("Could not load properties!", e)
            }

            val driverClassName = properties.getProperty("spring.datasource.driverClassName")
            SQL_DESCRIPTOR = when (driverClassName) {
                "org.postgresql.Driver" -> PostgresUUIDType.PostgresUUIDSqlTypeDescriptor.INSTANCE
                "org.h2.Driver" -> VarcharTypeDescriptor.INSTANCE
                else -> throw UnsupportedOperationException("Unsupported database!")
            }

            TYPE_DESCRIPTOR = UUIDTypeDescriptor.INSTANCE
        }
    }
}
