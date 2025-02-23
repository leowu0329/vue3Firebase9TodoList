<template>
  <div class="container mt-5">
    <Loading :is-loading="isLoading" />
    <h1 class="mb-4">Items</h1>
    <form @submit.prevent="showCreateModal" class="mb-4">
      <div class="input-group">
        <input
          v-model="newItem.name"
          class="form-control"
          placeholder="Item name"
          :disabled="isLoading"
        />
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isEditing ? 'Update Item' : 'Add Item' }}
        </button>
      </div>
    </form>
    <ul class="list-group">
      <li
        v-for="item in items"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ item.name }}</span>
        <div>
          <button
            @click="showUpdateModal(item)"
            class="btn btn-sm btn-outline-primary me-2"
            :disabled="isLoading"
          >
            Edit
          </button>
          <button
            @click="showDeleteModal(item)"
            class="btn btn-sm btn-outline-danger"
            :disabled="isLoading"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <Modal
      ref="createModal"
      id="createModal"
      title="Create Item"
      confirm-button-text="Create"
      @confirm="handleCreate"
    >
      <input
        v-model="newItem.name"
        class="form-control"
        placeholder="Item name"
      />
    </Modal>

    <Modal
      ref="updateModal"
      id="updateModal"
      title="Update Item"
      confirm-button-text="Update"
      @confirm="handleUpdate"
    >
      <input
        v-model="newItem.name"
        class="form-control"
        placeholder="Item name"
      />
    </Modal>

    <Modal
      ref="deleteModal"
      id="deleteModal"
      title="Confirm Deletion"
      confirm-button-text="Delete"
      confirm-button-class="btn btn-danger"
      @confirm="handleDelete"
    >
      <p>
        Are you sure you want to delete "{{
          itemToDelete ? itemToDelete.name : ''
        }}"?
      </p>
    </Modal>
  </div>
</template>

<script>
import { db } from '../modules/firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';

export default {
  components: {
    Loading,
    Modal,
  },
  data() {
    return {
      newItem: { name: '' },
      items: [],
      itemToDelete: null,
      isEditing: false,
      isLoading: false,
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      this.isLoading = true;
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        this.items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        this.isLoading = false;
      }
    },
    showCreateModal() {
      this.newItem = { name: '' };
      this.isEditing = false;
      this.$refs.createModal.show();
    },
    showUpdateModal(item) {
      this.newItem = { ...item };
      this.isEditing = true;
      this.$refs.updateModal.show();
    },
    showDeleteModal(item) {
      this.itemToDelete = item;
      this.$refs.deleteModal.show();
    },
    async handleCreate() {
      if (this.newItem.name.trim() && !this.isLoading) {
        this.isLoading = true;
        try {
          const docRef = await addDoc(collection(db, 'items'), {
            name: this.newItem.name,
          });
          this.items.push({
            id: docRef.id,
            name: this.newItem.name,
          });
          this.newItem = { name: '' };
          this.$refs.createModal.hide();
        } catch (error) {
          console.error('Error creating item:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    async handleUpdate() {
      if (this.newItem.name.trim() && !this.isLoading) {
        this.isLoading = true;
        try {
          await updateDoc(doc(db, 'items', this.newItem.id), {
            name: this.newItem.name,
          });
          const index = this.items.findIndex(
            (item) => item.id === this.newItem.id,
          );
          if (index !== -1) {
            this.items[index].name = this.newItem.name;
          }
          this.$refs.updateModal.hide();
        } catch (error) {
          console.error('Error updating item:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    async handleDelete() {
      if (!this.isLoading) {
        this.isLoading = true;
        try {
          await deleteDoc(doc(db, 'items', this.itemToDelete.id));
          this.items = this.items.filter(
            (item) => item.id !== this.itemToDelete.id,
          );
          this.itemToDelete = null;
          this.$refs.deleteModal.hide();
        } catch (error) {
          console.error('Error deleting item:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.list-group-item {
  transition: background-color 0.3s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
