const BASE_URL = 'http://localhost:8000/api';

export const fetchPortfolio = async () => {
    const response = await fetch(`${BASE_URL}/portfolio`);
    if (!response.ok) throw new Error('Failed to fetch portfolio');
    return response.json();
};

export const fetchExperiences = async () => {
    const response = await fetch(`${BASE_URL}/experiences`);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return response.json();
};

export const fetchSkills = async () => {
    const response = await fetch(`${BASE_URL}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
};

export const fetchEducation = async () => {
    const response = await fetch(`${BASE_URL}/education`);
    if (!response.ok) throw new Error('Failed to fetch education');
    return response.json();
};

export const fetchPublications = async () => {
    const response = await fetch(`${BASE_URL}/publications`);
    if (!response.ok) throw new Error('Failed to fetch publications');
    return response.json();
};

export const fetchAchievements = async () => {
    const response = await fetch(`${BASE_URL}/achievements`);
    if (!response.ok) throw new Error('Failed to fetch achievements');
    return response.json();
};

export const fetchCertifications = async () => {
    const response = await fetch(`${BASE_URL}/certifications`);
    if (!response.ok) throw new Error('Failed to fetch certifications');
    return response.json();
};

export const fetchContact = async () => {
    const response = await fetch(`${BASE_URL}/contact`);
    if (!response.ok) throw new Error('Failed to fetch contact info');
    return response.json();
};
