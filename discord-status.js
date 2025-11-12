document.addEventListener('DOMContentLoaded', () => {
    const userId = '653615551427641365';
    const container = document.getElementById('discord-card-container');
    const statusColors = {
        online: "#43b581",
        idle: "#faa61a",
        dnd: "#f04747",
        offline: "#747f8d"
    };

    const createHtml = (data) => {
        const user = data.discord_user;
        const status = data.discord_status;
        const spotify = data.spotify;
        const game = data.activities?.find(a => a.type === 0);
        const custom = data.activities?.find(a => a.type === 4);

        let activityHtml = `
            <div class="no-activity-card">
                <p>Nenhuma atividade no momento</p>
            </div>
        `;

        if (spotify) {
            activityHtml = `
                <div class="discord-activity-card" style="border-color: rgba(67, 181, 129, 0.2);">
                    <img src="${spotify.album_art_url}" alt="Album Art">
                    <div class="activity-text" style="min-width: 0;">
                        <p class="label" style="color: #43b581;">🎧 Ouvindo</p>
                        <p class="details">${spotify.song}</p>
                        <p class="sub-details">por ${spotify.artist}</p>
                    </div>
                </div>
            `;
        } else if (game) {
            let imageUrl = '/assets/dc/default-game.png'; // A default image
            if (game.assets?.large_image) {
                const asset = game.assets.large_image;
                if (asset.startsWith("mp:external")) {
                    imageUrl = asset.replace("mp:", "https://media.discordapp.net/");
                } else {
                    imageUrl = `https://cdn.discordapp.com/app-assets/${game.application_id}/${asset}.png`;
                }
            }
            activityHtml = `
                <div class="discord-activity-card" style="border-color: rgba(88, 101, 242, 0.2);">
                    <img src="${imageUrl}" alt="${game.name}">
                    <div class="activity-text" style="min-width: 0;">
                        <p class="label" style="color: #5865f2;">🎮 Jogando</p>
                        <p class="details">${game.name}</p>
                        <p class="sub-details">${game.details || ''}</p>
                    </div>
                </div>
            `;
        } else if (custom) {
            activityHtml = `
                <div class="discord-activity-card" style="border-color: rgba(255, 255, 255, 0.1);">
                    <div class="activity-text" style="min-width: 0;">
                        <p class="details">${custom.emoji?.name || '💬'} ${custom.state || ''}</p>
                    </div>
                </div>
            `;
        }

        const statusText = {
            online: 'Online',
            idle: 'Ausente',
            dnd: 'Não Perturbe',
            offline: 'Offline'
        };

        const statusBadgeBg = {
            online: 'rgba(67, 181, 129, 0.2)',
            idle: 'rgba(250, 166, 26, 0.2)',
            dnd: 'rgba(240, 71, 71, 0.2)',
            offline: 'rgba(116, 127, 141, 0.2)'
        };
        
        const statusBadgeColor = {
            online: '#43b581',
            idle: '#faa61a',
            dnd: '#f04747',
            offline: '#747f8d'
        };

        return `
            <div class="discord-card">
                <div class="discord-banner" style="background-image: url('assets/dc/bg.jpg');">
                    <div class="discord-banner-overlay"></div>
                </div>
                <div class="discord-content">
                    <div class="discord-avatar-wrapper">
                        <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256" alt="${user.username}" class="discord-avatar">
                        <div class="discord-status-indicator" style="background-color: ${statusColors[status] || statusColors.offline};"></div>
                    </div>
                    <div class="discord-names">
                        <h3>${user.global_name || user.username}</h3>
                        <p>@${user.username}</p>
                    </div>
                    <div class="discord-status-badge" style="background-color: ${statusBadgeBg[status]}; color: ${statusBadgeColor[status]}">
                        <span class="dot" style="background-color: ${statusBadgeColor[status]}"></span>
                        ${statusText[status]}
                    </div>
                    <div class="discord-divider"></div>
                    <div>
                        <h4 class="discord-activity-heading">Atividade</h4>
                        ${activityHtml}
                    </div>
                </div>
            </div>
        `;
    };

    const fetchStatus = async () => {
        try {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
            if (!res.ok) {
                throw new Error('Failed to fetch Lanyard API');
            }
            const { data } = await res.json();

            if (data) {
                container.innerHTML = createHtml(data);
            } else {
                throw new Error('No data from Lanyard API');
            }
        } catch (error) {
            console.error("Error fetching Discord status:", error);
            container.innerHTML = `
                <div class="discord-card-placeholder">
                    <p>Não foi possível carregar o status do Discord.</p>
                </div>
            `;
        }
    };

    fetchStatus();
    setInterval(fetchStatus, 15000);
});
