import Box from '../Box'
import AlurakutProfileSidebarMenuDefault from "../Menu/MenuProfileSidebarDefault"

const ProfileSidebar = (propriedades) => {
    return (
        <Box as="aside">
            <img src={`https://github.com/${propriedades.githubUser}.png`} alt="thelunardi"
                 style={{borderRadius: '8px'}} />
            <hr />
            <p>
                <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
                    @{propriedades.githubUser}
                </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

export default ProfileSidebar