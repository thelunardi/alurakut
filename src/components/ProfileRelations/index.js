import { ProfileRelationsBox } from './styles'
import Box from "../Box"

const ProfileRelations = (properties) => {
    return (
        <ProfileRelations.Wrapper>
            <Box>
                <h2 className="smallTitle">
                    {properties.title} ({properties.items.length})
                </h2>
                <ul>
                    {
                        properties.items && properties.items.map(item => {
                            return (
                                <li key={item.id}>
                                    <a href={item.url} target="_blank" key={item.id}>
                                        <img src={item.image} alt={item.image} />
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </Box>
        </ProfileRelations.Wrapper>
    )
}

export default ProfileRelations

ProfileRelations.Wrapper = ProfileRelationsBox
