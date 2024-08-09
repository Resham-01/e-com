export const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`/api/users/userDetails/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch user data failed:', error);
        return null;
    }
};
