<script>
  /**
   * Portal - Utility component for rendering content outside the DOM hierarchy
   *
   * Teleports children to a specified target (default: document.body).
   * Useful for modals, tooltips, popovers that need to escape parent stacking contexts.
   *
   * @component
   * @example
   * <Portal>
   *   <div>This content will be rendered at document.body</div>
   * </Portal>
   */

  /**
   * Target element where content should be rendered
   * Defaults to document.body
   * @type {HTMLElement}
   */
  export let target = undefined;

  /**
   * Svelte action to portal an element to a target
   * @param {HTMLElement} node - The node to portal
   * @returns {{destroy: Function}}
   */
  function portal(node) {
    const targetElement = target || document.body;
    targetElement.appendChild(node);

    return {
      destroy() {
        if (node.parentNode === targetElement) {
          targetElement.removeChild(node);
        }
      }
    };
  }
</script>

<div use:portal>
  <slot />
</div>
