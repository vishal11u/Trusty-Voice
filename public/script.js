(function () {
  // Create widget container
  const container = document.createElement('div')
  container.id = 'trustscribe-widget'
  document.body.appendChild(container)

  // Load widget component
  const widgetScript = document.createElement('script')
  widgetScript.src = 'https://widget.trustscribe.com/v1/widget.js'
  widgetScript.crossOrigin = 'anonymous'
  widgetScript.async = true
  document.head.appendChild(widgetScript)

  // Initialize widget when script is loaded
  widgetScript.onload = () => {
    const widgetId = widgetScript.dataset.widgetId
    const theme = widgetScript.dataset.theme || 'light'
    const position = widgetScript.dataset.position || 'bottom-right'
    const autoRotate = widgetScript.dataset.autoRotate !== 'false'
    const rotationInterval = parseInt(widgetScript.dataset.rotationInterval) || 5000
    const chatbot = widgetScript.dataset.chatbot === 'true'

    // Create widget instance
    const widget = new TrustScribe.Widget({
      widgetId,
      theme,
      position,
      autoRotate,
      rotationInterval,
      chatbot,
    })

    // Mount widget
    widget.mount(container)
  }
})() 