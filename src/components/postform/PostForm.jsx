import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import { useNavigate } from 'react-router-dom'
import appwriteservice from '../../appwrite/config'
import { useSelector } from 'react-redux'
function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const submit = async (data) => {
        if (post) {
         const file = data.image[0] ? await appwriteservice.uploadfile(data.image[0]) : null
            if (file) {
                appwriteservice.deletefile(post.featuredImage)
            }
            const dbpost = await appwriteservice.updatepost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
                if(dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            
        } else {
            const file = await appwriteservice.uploadfile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
              const dbpost=   await appwriteservice.createpost({
                    ...data,
                    userId: userData.$id
                })
                if(dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugtranform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLocaleLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g,'-')
        }
        return ''

    }, [])
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugtranform(value.title), { shouldValidate: true })
            }
        })
        return () => subscription.unsubscribe()
        
    }, [watch, slugtranform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugtranform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteservice.getfilepreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );

}

export default PostForm

