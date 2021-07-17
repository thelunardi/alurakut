import nookies from "nookies"

const Logout = () => {
    return (
        <br/>
    )
}

export const getServerSideProps = async (context) => {
    nookies.destroy(context, 'USER_TOKEN')

    return {
        redirect: {
            destination: '/login',
            permanent: false,
        }
    }
}

export default Logout