<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            :class="confirmButtonClass"
            @click="$emit('confirm')"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'Modal',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    confirmButtonText: {
      type: String,
      default: 'Confirm',
    },
    confirmButtonClass: {
      type: String,
      default: 'btn btn-primary',
    },
  },
  methods: {
    show() {
      const modalElement = document.getElementById(this.id);
      const modal = new Modal(modalElement);
      modal.show();
    },
    hide() {
      const modalElement = document.getElementById(this.id);
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    },
  },
};
</script>
