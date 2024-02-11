'use client';

import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { FilePond, registerPlugin } from 'react-filepond';
import { useForm } from 'react-hook-form';

import type { Address, Country } from '@/interfaces';
import * as Doka from '@/lib/doka_6.4.0/lib/doka.esm.min';
import es_ES from '@/lib/doka_6.4.0/lib/locale/es_ES';

import '@/lib/doka_6.4.0/lib/doka.min.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import styles from '@/css/profile-form.module.css';

type FormInputs = {
  name: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  currentPassword: string;
};

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
);

export const ProfileForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {},
  });

  const { data: session } = useSession({
    required: true,
  });

  const onSubmit = async (data: FormInputs) => {};

  const editor = Doka.create({
    ...es_ES,
    utils: ['crop', 'filter', 'color'],
    cropMinImageWidth: 100,
    cropMinImageHeight: 100,
    styleLayoutMode: 'modal',
    cropAllowImageTurnRight: true,
  });

  window.addEventListener(
    'popstate',
    (event) => {
      if (event.state) {
        editor.close();
      }
    },
    false,
  );

  return (
    <div className="max-w-[900px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className={styles['grid-container']}>
          <div className="mt-5">
            <FilePond
              labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
              stylePanelLayout="compact circle"
              styleLoadIndicatorPosition="center bottom"
              styleButtonRemoveItemPosition="left bottom"
              styleProgressIndicatorPosition="right bottom"
              styleButtonProcessItemPosition="right bottom"
              imageCropAspectRatio="1:1"
              imagePreviewHeight={170}
              imageResizeTargetWidth={170}
              imageResizeTargetHeight={170}
              imageEditEditor={editor}
            />
          </div>
          <div className="sm:max-w-96">
            <div className="mb-2 flex flex-col">
              <span>Nombre y apellido</span>
              <input
                type="text"
                className="mt-2 rounded-md bg-neutral p-2 outline-none focus:outline-primary"
                {...register('name', { required: true })}
              />
            </div>

            <div className="mb-2 flex flex-col">
              <span>Correo electrónico</span>
              <input
                type="email"
                className="mt-2 rounded-md bg-neutral p-2 outline-none focus:outline-primary"
                {...register('email', { required: true })}
              />
            </div>

            <div className="mb-2 flex flex-col">
              <span>Nueva contraseña</span>
              <input
                type="text"
                className="mt-2 rounded-md bg-neutral p-2 outline-none focus:outline-primary"
                {...register('newPassword', { required: true })}
              />
            </div>

            <div className="mb-2 flex flex-col">
              <span>Confirmar contraseña</span>
              <input
                type="text"
                className="mt-2 rounded-md bg-neutral p-2 outline-none focus:outline-primary"
                {...register('confirmNewPassword', { required: true })}
              />
            </div>

            <div className="mb-2 flex flex-col">
              <span>Contraseña actual</span>
              <input
                type="text"
                className="mt-2 rounded-md bg-neutral p-2 outline-none focus:outline-primary"
                {...register('currentPassword', { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="mb-2 mt-5 w-72 items-center self-center sm:mt-10">
          <button
            disabled={!isValid}
            type="submit"
            className={clsx('w-full', {
              'btn-primary': isValid,
              'btn-disabled': !isValid,
            })}
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};
