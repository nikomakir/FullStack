const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('blogs')).not.toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('blogs')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Me', 'http...')
      await expect(page.getByText('Test Title Me view')).toBeVisible()
      const viewButton = await page.getByRole('button', { name: 'view' })
      await expect(viewButton).toBeVisible()
      await viewButton.click()
      await expect(page.getByText('likes 0')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Me', 'http...')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
      await expect(page.getByText('likes 0')).not.toBeVisible()
    })

    test('user\'s blog can be deleted', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Me', 'http...')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Test Title Me view')).not.toBeVisible()
      await expect(page.getByText('Test Title Me hide')).not.toBeVisible()
    })

    test('only current user\s blogs\'s remove button shows', async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'Matti Meikäläinen',
          username: 'mmeika',
          password: 'topsecret'
        }
      })
      await createBlog(page, 'Test Title', 'Me', 'http...')
      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'mmeika', 'topsecret')
      const firstBlog = await page.getByText('Test Title Me view')
      await expect(firstBlog).toBeVisible()
      await firstBlog.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

      await createBlog(page, 'Completely Different', 'You', 'website')

      const secondBlog = await page.getByText('Completely Different You view')
      await expect(page.getByText('Test Title Me hide')).toBeVisible()
      await expect(secondBlog).toBeVisible()
      await secondBlog.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('blogs are sorted by most likes', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Me', 'http...')
      await createBlog(page, 'Completely Different', 'You', 'website')

      const blogsAtStart = page.getByTestId('blog')

      await expect(blogsAtStart.first()).toContainText('Test Title Me')
      await expect(blogsAtStart.last()).toContainText('Completely Different You')

      await page.getByText('Test Title Me view').getByRole('button', { name: 'view' }).click()
      await page.getByText('Completely Different You view').getByRole('button', { name: 'view' }).click()
      await page.getByText('Completely Different You hide').locator('..').getByRole('button', { name: 'like' }).click()

      const blogs = page.getByTestId('blog')

      await expect(blogs.first()).toContainText('Completely Different You')
      await expect(blogs.last()).toContainText('Test Title Me')
    })
  })
})
