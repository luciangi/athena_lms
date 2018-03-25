import com.nyx.athena.security.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.authority.AuthorityUtils.createAuthorityList
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailService : UserDetailsService {
    @Autowired
    private lateinit var repository: UserRepository

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val currentUser = repository.findByUsername(username)
        val fold = currentUser.roles.fold(ArrayList<String>(),
                { accumulator, item -> accumulator.add(item.toString()); accumulator }).toTypedArray()
        return User(username, currentUser.password,
                createAuthorityList(*fold))
    }
}
