import Box from '../Box'

const ProfileSidebar = (propriedades) => {
    return (
        <Box>
            {
                <img src={`https://github.com/${propriedades.githubUser}.png`} alt="thelunardi" style={{ borderRadius: '8px' }} />
            }
        </Box>
    )
}

export default ProfileSidebar