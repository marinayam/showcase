"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

import FormField from './FormField';
import Button from './Button';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants';
import { updateProject, createNewProject, fetchToken } from '@/lib/actions';
import { FormState, ProjectInterface, SessionInterface } from '@/common.types';

type Props = {
  type: string,
  session: SessionInterface,
  project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    InstagramUrl: project?.InstagramUrl || "",
    category: project?.category || ""
  })

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image!');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result)
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true)
    const { token } = await fetchToken()

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token)
        router.push("/")
      }
      
      if (type === "edit") {
        await updateProject(form, project?.id as string, token)
        router.push("/")
      }

    } catch (error) {
      alert(` projectを ${type === "create" ? "create" : "edit"} に失敗しました。 再度お試しください`);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'イメージ画像を選択する'}
        </label>
        <input
          id="image"
          type="file"
          accept='image/*'
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20" alt="image"
            fill
          />
        )}
      </div>

      <FormField
        title="タイトル"
        state={form.title}
        placeholder="人気アイブロウメニュー"
        setState={(value) => handleStateChange('title', value)}
      />

      <FormField
        title='説明'
        state={form.description}
        placeholder="最近、韓国で流行中のアイブロウデザインです"
        isTextArea
        setState={(value) => handleStateChange('description', value)}
      />

      <FormField
        type="url"
        title="Instagram URL"
        state={form.InstagramUrl}
        placeholder="https://www.instagram.com/"
        setState={(value) => handleStateChange('InstagramUrl', value)}
      />

      <CustomMenu
        title="カテゴリー"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={submitting ? `${type === "create" ? "作成中" : "編集中"}` : `${type === "create" ? "作成" : "編集"}`}
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm