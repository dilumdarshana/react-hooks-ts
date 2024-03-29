import { useContext, useEffect, Suspense } from 'react';
import SiteDataContext from '../contexts/siteData';
import { SiteDataContextType } from '../@types/siteDataContext.td';
import useFetch from '../hooks/useFetch';

interface ApiResponse {
    loading: boolean;
    data: {
        first_name: string;
        last_name: string;
        email: string;
    };
}

const Users = () => {
    const { setPageTitle } = useContext(SiteDataContext) as SiteDataContextType;
    let userList: { id: number; first_name: string; last_name: string; email: string }[] = [];

    const options = {
        url: 'https://reqres.in/api/users',
        method: 'GET'
    }

    useEffect(() => {
        setPageTitle('Users');
    }, []);

    const { loading, data } = useFetch(options);

    if (!loading && data && data.data) {
        userList = data.data;
    }

    return (
        <div className="app-separator">
            <p>Users</p>
            <table className="users">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <Suspense fallback="Loading...">
                    <tbody>
                        {
                            userList.map(user => (
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Suspense>
            </table>
        </div>
    )
}

export default Users;
