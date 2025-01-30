<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { onMounted, ref } from 'vue';

const firstInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  firstInput.value?.focus();
})
const required = { required_error: 'Complete this field' }

const validationSchema = toTypedSchema(
  z.object({
    title: z.string(required)
      .min(1, { message: 'At least 1 char'})
      .max(20, { message: 'At most 20 chars'}),
      image: z.string(required),
    price: z.number(required)
      .min(0, { message: 'Must be > 0'})
      .max(15000, { message: 'Must be < 15000'}),
    description: z.string(required)
      .min(10, { message: 'At least 10 chars'})
      .max(200, { message: 'At most 200 chars'}),
    category: z.string(required)
  })
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema
})

const title = useField('title');
const image = useField('image');
const price = useField('price');
const description = useField('description');
const category = useField('category');

const trySubmit = handleSubmit(async (formValues, { resetForm}) => {
  try {
    await fetch('https://restapi.fr/api/vuetestproducts', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    resetForm();
    firstInput.value?.focus();

  } catch(e) {
    console.log(e);
  }
})

</script>

<template>
  <div class="card">
   <h3 class="mb-10">Add an item</h3>
   <form @submit="trySubmit">

    <div class="d-flex flex-column mb-20">
      <label class="mb-5">*Title</label>
      <input ref='firstInput' v-model="title.value.value" type="text" />
      <small
        class="form-error"
        v-if="title.errorMessage.value"
      >
        {{ title.errorMessage.value }}
      </small>
    </div>

    <div class="d-flex flex-column mb-20">
      <label class="mb-5">*image</label>
      <input v-model="image.value.value" type="text" />
      <small
        class="form-error"
        v-if="image.errorMessage.value"
      >
        {{ image.errorMessage.value }}
      </small>
    </div>

    <div class="d-flex flex-column mb-20">
      <label class="mb-5">*price</label>
      <input v-model="price.value.value" type="number" />
      <small
        class="form-error"
        v-if="price.errorMessage.value"
      >
        {{ price.errorMessage.value }}
      </small>
    </div>

    <div class="d-flex flex-column mb-20">
      <label class="mb-5">*description</label>
      <textarea v-model="(description.value.value as string)"></textarea>
      <small
        class="form-error"
        v-if="description.errorMessage.value"
      >
        {{ description.errorMessage.value }}
      </small>
    </div>

    <div class="d-flex flex-column mb-20">
      <label class="mb-5">*category</label>
      <select v-model="category.value.value">
        <option value>Select one</option>
        <option value="gamer">gamer</option>
        <option value="desktop">desktop</option>
        <option value="streaming">streaming</option>
      </select>
      <small
        class="form-error"
        v-if="category.errorMessage.value"
      >
        {{ category.errorMessage.value }}
      </small>
    </div>

    <button class="btn btn-primary" :disabled="isSubmitting">Save</button>
   </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
}
</style>
