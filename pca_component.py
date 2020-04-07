from sklearn.decomposition import PCA
import pandas as pd
import numpy as np
from sklearn.manifold import MDS
from sklearn.metrics import pairwise_distances

def remove_extra_cols(dataset):

    dataset = dataset.drop(columns = ['clusters','Unnamed: 0']) 
        
    return dataset

def pca(dataset):
 
    pca = PCA(n_components=31)
    pcomponent = pca.fit_transform(dataset)
    exp_var = pca.explained_variance_ratio_
    cum_exp_var = np.cumsum(pca.explained_variance_ratio_)
    principalDf = pd.DataFrame(pcomponent)
    pcomponent = np.transpose(principalDf).values.tolist()
    
    return pcomponent,  exp_var.tolist(),   cum_exp_var.tolist(),   pca

def task2_top3attr(pca,colnames):
    loadings = pca.components_.T*np.sqrt(pca.explained_variance_)
    df_loading  = pd.DataFrame(loadings,index=colnames)
    df_loading["sum_loadings"]= np.sum(df_loading,axis=1)
    df_loading = df_loading.sort_values(by = ["sum_loadings"],ascending= False)

    return list(df_loading.index[0:3])

def task3_get_MDS_data(dataset,metric_type):

    mds = MDS(n_components  = 2,  dissimilarity  = 'precomputed')
    distance_matrix = pairwise_distances(dataset,   metric = metric_type)
    mds_trans = mds.fit_transform(distance_matrix)

    return  mds_trans.tolist()

def get_top3_pca_atttr_data(dataset,colnames,top3_attr):
  
    data = []
    indexes = [colnames.index(x) for x in  top3_attr]
    [data.append(dataset[str(i)]) for i in indexes]
    data = np.transpose(data).tolist()
    data_new  = []
    for i in range(len(data)):
        data_new.append({top3_attr[0]: data[i][0],top3_attr[1]: data[i][1],top3_attr[2]: data[i][2]})
    return data_new