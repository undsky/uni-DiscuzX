function phiz(content) {
	content = content.replace(/\n/g, '<br/>')
	content = content.replace(/\[mobcent_phiz=(.*?)\]/g,
		'<img src="$1"/>');
	content = content.replace(/\[video\](.*?)\[\/video\]/g,
		'<video controls controlslist="nodownload" src="$1"></video>')
	return content;
}

function content(content) {
	let h = ''
	if (content) {
		for (let item of content) {
			if (0 == item.type && item.infor) {
				h += phiz(item.infor || '')
			} else if (1 == item.type && item.infor) {
				if (item.infor.indexOf('//forum') == -1)
					h += `<img src="${item.infor}"/>`
			} else if (2 == item.type && item.infor) {
				h += `<video controls controlslist="nodownload" src="${item.infor}"></video>`
			} else if (3 == item.type && item.infor) {
				h += `<audio controls controlslist="nodownload" src="${item.infor}"></audio>`
			} else if ((4 == item.type || 5 == item.type) && item.infor) {
				if (['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'].indexOf(item.infor.substr(item.infor
						.lastIndexOf('.') +
						1)) > -1) {
					h += `<img src="${item.url}"/>`
				} else {
					h += `<a href="${item.url}">&nbsp;${item.infor}</a>`
				}
			}
		}
	}
	return h
}

export default {
	phiz,
	content
}
