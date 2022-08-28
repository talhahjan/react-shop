import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// this hooks will get sections and its categories linked to those  section
export const useSections = () => {
  return useQuery(
    "sections",
    () =>
      axios.get(`api/sections`).catch((error) => {
        throw new Error(error);
      }),
    {
      cacheTime: 50000,
      // redirect user to 520 error page if any error occurred
    }
  );
};

// this hooks will last 10 latest product
export const useLatestProduct = () => {
  return useQuery("products-latest", () =>
    axios.get(`api/products/latest`).catch((error) => {
      throw new Error(error);
    })
  );
};

// this hooks will 10 featured products

export const useFeaturedProduct = () => {
  return useQuery(
    "products-featured",
    () =>
      axios.get(`api/products/featured`).catch((error) => {
        throw new Error(error);
      }),
    {
      cacheTime: 50000,
    }
  );
};
export const usePopularBrands = () => {
  return useQuery(
    "brands-popluar",
    () =>
      axios.get(`api/brands/popular`).catch((error) => {
        throw new Error(error);
      }),
    {
      cacheTime: 50000,
      // redirect user to 520 error page if any error occurred
    }
  );
};

// this hook will fetch single product details
export const useProduct = (slug) => {
  return useQuery(["product", slug], () => {
    return axios.get(`api/product/${slug}`).catch((error) => {
      throw new Error(error);
    });
  });
};

// this hooks will collects all the products in particular sections
export const useSection = (slug) => {
  return useInfiniteQuery(
    ["section", slug],
    ({ pageParam = 1 }) => axios.get(`api/section/${slug}?page=${pageParam}`),

    {
      getNextPageParam: (pages) => {
        // let us to destructure last page and current page pages.data variable
        let { current_page, last_page } = pages.data;
        if (current_page < last_page) return current_page + 1;
        else return undefined;
      },
    }
  );
};

// this hooks will collects all the products in particular category
export const useCategory = (slug) => {
  return useInfiniteQuery(
    ["category", slug],
    ({ pageParam = 1 }) => axios.get(`api/category/${slug}?page=${pageParam}`),
    {
      getNextPageParam: (pages) => {
        // let us to destructure last page and current page pages.data variable
        let { current_page, last_page } = pages.data;
        if (current_page < last_page) return current_page + 1;
        else return undefined;
      },
    }
  );
};

export const useProfile = () => {
  const navigate = useNavigate();
  return useQuery("user-profile", () => {
    return axios
      .get(`api/user/pofile`)
      .catch((error) => {
        const { status, statusText } = error.response;
        const { message, code } = error;
        navigate(`/error/${error.response.status}`, {
          state: {
            status: status,
            message: message,
            code: code,
            statusText: statusText,
          },
        });
      })

      .then((response) => {
        return response.data;
      });
  });
};

const UpdateProfile = async (values) => {
  return await axios.post(`api/user/profile/edit`, values).catch((error) => {
    throw new Error(error);
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(UpdateProfile, {
    onMutate: async (newData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("user-profile");

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData("user-profile");
      queryClient.setQueryData("user-profile", (oldQueryData) => {
        return {
          ...oldQueryData,
          email: newData.email,
          profile: { ...oldQueryData.profile, ...newData },
        };
      });
      return { previousProfile };
    },

    onSettled: () => {
      queryClient.invalidateQueries("user-profile");
    },

    onSuccess: () => {
      toast.success("Profile Updated Successfully !");
    },
    onError: (_error, _NewData, context) => {
      queryClient.setQueryData("user-profile", context.previousProfile);
      toast.error("Profile Could not be Updated !");
    },
  });
};
// export const useUpdateProfile=useMutation()

export const useFilter = () => {
  return useQuery(
    "filter",
    () =>
      axios
        .get(`api/filter`)
        .catch((error) => {
          throw new Error(error);
        })
        .then((response) => {
          return response.data;
        }),
    {
      cacheTime: 50000,
      // enabled: false,
      // redirect user to 520 error page if any error occured
    }
  );
};
