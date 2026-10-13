const portfolioProjects = [
  {
    title: 'Omnifood',
    description:
      'A responsive meal-delivery landing page concept, presenting the service, menu, customer stories, and subscription options in a clear, polished layout.',
    image: 'assets/img/portfolio0.jpg',
    imageAlt: 'Omnifood meal-delivery landing page displayed on desktop and mobile',
    categories: ['web', 'uiux'],
    categoryLabel: 'Web Development · UI/UX Design',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Horus Moving',
    description:
      'A responsive website for Horus Moving, introducing the moving service with a prominent brand presentation and contact options.',
    image: 'assets/img/portfolio1.jpg',
    imageAlt: 'Horus Moving website displayed on desktop and mobile',
    categories: ['web'],
    categoryLabel: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://horusmoving.com',
  },
  {
    title: 'ThesisHub',
    description:
      'A frontend workspace for managing final-year projects from proposal to defense. Students can follow submissions, supervisors can review chapters and provide feedback, and coordinators can oversee approvals, schedules, and evaluations.',
    image: 'assets/img/thesishub-preview.svg',
    imageAlt:
      'Illustrated ThesisHub project-management dashboard preview showing academic project stages',
    categories: ['web', 'other'],
    categoryLabel: 'Web Development · Academic Management',
    technologies: ['Frontend Web App', 'Project Management', 'Academic Workflow'],
    liveUrl: 'https://final-year-app-8y92.vercel.app/',
  },
  {
    title: 'JavaScript Task Manager',
    description:
      'A task-management interface concept with a focused JavaScript workflow for organizing and completing tasks.',
    image: 'assets/img/portfolio2.jpg',
    imageAlt: 'JavaScript task-management project illustration',
    categories: ['javascript'],
    categoryLabel: 'JavaScript Projects',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'React Shopping Cart',
    description:
      'An e-commerce application concept centered on a product cart and a responsive shopping experience.',
    image: 'assets/img/portfolio3.jpg',
    imageAlt: 'React shopping-cart application illustration',
    categories: ['web', 'other'],
    categoryLabel: 'Other Projects',
    technologies: ['React', 'Redux', 'JavaScript'],
  },
]

const galleryGrid = document.querySelector('[data-gallery-grid]')
const galleryStatus = document.querySelector('[data-gallery-status]')
const galleryFilters = document.querySelectorAll('[data-gallery-filter]')
const galleryDialog = document.querySelector('[data-gallery-dialog]')

function createGalleryTag(label) {
  const tag = document.createElement('li')
  tag.className = 'portfolio-gallery__tag'
  tag.textContent = label
  return tag
}

function handleGalleryImageError(image) {
  image.hidden = true
  image.parentElement.classList.add('is-image-missing')
}

function createProjectCard(project, index) {
  const card = document.createElement('article')
  card.className = 'portfolio-gallery__card'
  card.style.setProperty('--gallery-card-index', index)

  const imageWrap = document.createElement('div')
  imageWrap.className = 'portfolio-gallery__image-wrap'

  const image = document.createElement('img')
  image.className = 'portfolio-gallery__image'
  image.src = project.image
  image.alt = project.imageAlt
  image.loading = 'lazy'
  image.addEventListener('error', () => handleGalleryImageError(image), {
    once: true,
  })
  imageWrap.append(image)

  const body = document.createElement('div')
  body.className = 'portfolio-gallery__card-body'

  const category = document.createElement('p')
  category.className = 'portfolio-gallery__eyebrow'
  category.textContent = project.categoryLabel

  const title = document.createElement('h3')
  title.className = 'portfolio-gallery__card-title'
  title.textContent = project.title

  const description = document.createElement('p')
  description.className = 'portfolio-gallery__card-description'
  description.textContent = project.description

  const tags = document.createElement('ul')
  tags.className = 'portfolio-gallery__tags'
  tags.setAttribute('aria-label', 'Technologies used')
  project.technologies.forEach((technology) =>
    tags.append(createGalleryTag(technology))
  )

  const actions = document.createElement('div')
  actions.className = 'portfolio-gallery__card-actions'

  const detailsButton = document.createElement('button')
  detailsButton.className = 'portfolio-gallery__details-button'
  detailsButton.type = 'button'
  detailsButton.textContent = 'View project details'
  detailsButton.setAttribute('aria-label', `View ${project.title} details`)
  detailsButton.addEventListener('click', () => openProjectPreview(project))
  actions.append(detailsButton)

  if (project.liveUrl) {
    const liveLink = document.createElement('a')
    liveLink.className = 'portfolio-gallery__card-live'
    liveLink.href = project.liveUrl
    liveLink.target = '_blank'
    liveLink.rel = 'noopener noreferrer'
    liveLink.textContent = 'Live site'
    liveLink.setAttribute('aria-label', `Visit ${project.title} live site`)
    actions.append(liveLink)
  }

  body.append(category, title, description, tags, actions)
  card.append(imageWrap, body)
  return card
}

function renderProjects(filter = 'all') {
  const visibleProjects = portfolioProjects.filter(
    (project) => filter === 'all' || project.categories.includes(filter)
  )

  galleryGrid.replaceChildren(
    ...visibleProjects.map((project, index) => createProjectCard(project, index))
  )
  galleryStatus.textContent = `${visibleProjects.length} ${
    visibleProjects.length === 1 ? 'project' : 'projects'
  } shown`
}

function setProjectLink(link, url) {
  if (url) {
    link.href = url
    link.hidden = false
  } else {
    link.removeAttribute('href')
    link.hidden = true
  }
}

function openProjectPreview(project) {
  const image = galleryDialog.querySelector('[data-gallery-dialog-image]')
  const imageWrap = image.parentElement

  image.hidden = false
  imageWrap.classList.remove('is-image-missing')
  image.src = project.image
  image.alt = project.imageAlt
  image.onerror = () => handleGalleryImageError(image)

  galleryDialog.querySelector('[data-gallery-dialog-category]').textContent =
    project.categoryLabel
  galleryDialog.querySelector('[data-gallery-dialog-title]').textContent =
    project.title
  galleryDialog.querySelector(
    '[data-gallery-dialog-description]'
  ).textContent = project.description

  const tags = galleryDialog.querySelector('[data-gallery-dialog-tags]')
  tags.replaceChildren(
    ...project.technologies.map((technology) => createGalleryTag(technology))
  )

  setProjectLink(
    galleryDialog.querySelector('[data-gallery-live-link]'),
    project.liveUrl
  )
  setProjectLink(
    galleryDialog.querySelector('[data-gallery-source-link]'),
    project.sourceUrl
  )

  galleryDialog.showModal()
  document.body.classList.add('portfolio-gallery-modal-open')
  galleryDialog.querySelector('[data-gallery-close]').focus()
}

galleryFilters.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    galleryFilters.forEach((button) => {
      const isSelected = button === filterButton
      button.classList.toggle('is-active', isSelected)
      button.setAttribute('aria-pressed', String(isSelected))
    })
    renderProjects(filterButton.dataset.galleryFilter)
  })
})

galleryDialog
  .querySelector('[data-gallery-close]')
  .addEventListener('click', () => galleryDialog.close())

galleryDialog.addEventListener('click', (event) => {
  if (event.target === galleryDialog) galleryDialog.close()
})

galleryDialog.addEventListener('cancel', (event) => {
  event.preventDefault()
  galleryDialog.close()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && galleryDialog.open) {
    galleryDialog.close()
  }
})

galleryDialog.addEventListener('close', () => {
  document.body.classList.remove('portfolio-gallery-modal-open')
})

renderProjects()
