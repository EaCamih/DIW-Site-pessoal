const user = 'EaCamih';
const my_token = ''; // Coloque aqui o token de autenticação para evitar Rate Limits da API do GitHub!!s

async function loadInfos() {
    const response = await fetch(`https://api.github.com/users/${user}`, {
        method: 'GET',
        'headers': {
            'Authorization': `token ${my_token}`
        }
    });
    const data = await response.json();
    if(!data.login) return alert('Erro ao carregar informações do usuário!');

    document.getElementById('headerName').innerHTML = data.login;
    document.getElementById('profileName').innerHTML = data.name;
    document.getElementById('profileDescription').innerHTML = data.bio;
    document.getElementById('profileLocation').innerHTML = data.location;
    document.getElementById('profileBlog').innerHTML = data.blog;
    document.getElementById('profileBlog').href = data.blog;
    document.getElementById('profileFollowers').innerHTML = data.followers;
    document.getElementById('profileAvatar').src = data.avatar_url;
    document.getElementById('headerProfile').href = data.html_url;
    document.getElementById('headerRepos').href = data.html_url + '?tab=repositories';
    document.getElementById('headerFollowers').href = data.html_url + '?tab=followers';

    const responseRepos = await fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET',
        'headers': {
            'Authorization': `token ${my_token}`
        }
    });
    const repos = await responseRepos.json();
    console.log(repos[0])

    repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.innerHTML =`
            <a class="repo" href="repo.html?owner=${repo.owner.login}&repo=${repo.name}">
                <h1>${repo.name}</h1>
                <p>${repo.description || "Repositório sem descrição"}</p>
                <div class="status">
                    <i class="fa-solid fa-star"><span>${repo.stargazers_count}</span></i>
                    <i class="fa-solid fa-user"><span>${repo.watchers}</span></i>
                </div>
            </a>
        `;
        document.getElementById('repos').appendChild(repoElement);
    });
    document.getElementById('reposTitle').innerHTML = `Repositórios (${repos.length})`;


    const team = document.getElementById('team');
    const colegas = ['DGBBraga', 'GabrielRMA1', 'srbouleto', 'LeonardodeSouzaGalvao', 'piterofc'];
    colegas.forEach(async colega => {
        const responseColega = await fetch(`https://api.github.com/users/${colega}`, {
            method: 'GET',
            'headers': {
                'Authorization': `token ${my_token}`
            }
        });
        const dataColega = await responseColega.json();

        const colegaElement = document.createElement('div');
        colegaElement.innerHTML =`
            <a href=${dataColega.html_url} class="person">
                <img src="${dataColega.avatar_url}" alt="Avatar do colega ${colega}"/>
                <p>${dataColega.login}</p>
            </a>
        `;
        team.appendChild(colegaElement);
    });
}

window.onload = loadInfos;