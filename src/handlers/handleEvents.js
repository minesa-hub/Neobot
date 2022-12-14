// Handling Events
const handleEvents = client => {
    client.handleEvents = async eventFiles => {
        for (const file of eventFiles) {
            const event = await import(`../events/${file}`).then(module => module.default);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
};

export default handleEvents;
