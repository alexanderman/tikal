
function calculate(data) {
    const agentsMap = {}; // agentId -> [mission]
    const countriesMap = {}; // country -> number of isolated agents
    let country, degree = 0;

    data.forEach(item => {
        agentsMap[item.agent] = [...(agentsMap[item.agent] || []), item];
    });

    Object.keys(agentsMap).forEach(agent => {
        const agentMissions = agentsMap[agent];
        if (agentMissions.length === 1) {
            countriesMap[agentMissions[0].country] = (countriesMap[agentMissions[0].country] || 0) + 1;

            if (degree < countriesMap[agentMissions[0].country]) {
                degree = countriesMap[agentMissions[0].country];
                country = agentMissions[0].country;
            }            
        }
    });

    return { country, degree };
}

export default calculate;