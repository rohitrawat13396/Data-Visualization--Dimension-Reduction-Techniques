import json

from flask import Flask, render_template, request, redirect, Response, jsonify
import pandas as pd
from pca_component import remove_extra_cols, pca, task2_top3attr, task3_get_MDS_data, get_top3_pca_atttr_data
import numpy as np

app = Flask(__name__)
#By default, a route only answers to GET requests. You can use the methods argument of the route() decorator to handle different HTTP methods.

#Reading Files
df_mm   =   pd.read_csv('datasets/dataset_mm.csv')
df_random   =   pd.read_csv('datasets/dataset_random.csv')
df_strata   =   pd.read_csv('datasets/dataset_strata.csv')

#Removing extra cols
df_mm   =   remove_extra_cols(df_mm)
df_random   =   remove_extra_cols(df_random)
df_strata   =   remove_extra_cols(df_strata)

#   Task 2(i): find the intrinsic dimensionality of the data using PCA 
pcomponent_mm,  expl_var_ratio_mm,  cum_expl_var_ratio_mm, pca_mm = pca(df_mm)
pcomponent_random,  expl_var_ratio_random,  cum_expl_var_ratio_random,  pca_random = pca(df_random)
pcomponent_strata,  expl_var_ratio_strata,  cum_expl_var_ratio_strata,  pca_strata = pca(df_strata)

#   Task 2(ii): produce scree plot visualization and mark the intrinsic dimensionality and
#   Task 2(iii): show the scree plots before/after sampling to assess the bias introduced 
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/task2")
def get_data():
    
    data = {
    "pcomponent_mm":    pcomponent_mm,  "expl_var_ratio_mm":  expl_var_ratio_mm,"cum_expl_var_ratio_mm":  cum_expl_var_ratio_mm,
    "pcomponent_random":    pcomponent_random,  "expl_var_ratio_random":  expl_var_ratio_random,"cum_expl_var_ratio_random":  cum_expl_var_ratio_random,
    "pcomponent_strata":    pcomponent_strata,  "expl_var_ratio_strata":  expl_var_ratio_strata,"cum_expl_var_ratio_strata":  cum_expl_var_ratio_strata
    }

    return data

#   Task 2(iv):   Top 3 attributes with highest loading

#   Getting column names
df_forcolm = pd.read_csv('datasets/dataset_withcol.csv')
colnames = list(df_forcolm.columns)
colnames.remove('Unnamed: 0')   #Removing default index column

#task2_top3attr() from pca_component.py to obtain top 3 attributes
top3_attr_mm    =   task2_top3attr(pca_mm,colnames)
top3_attr_random    =   task2_top3attr(pca_random,colnames)
top3_attr_strata    =   task2_top3attr(pca_strata,colnames)

#   Task 3(i):  visualize the data projected into the top two PCA vectors via 2D scatterplot 
@app.route("/task3")
def get_data_task3():
    
    data = {"pcomponent_mm":    np.transpose(pcomponent_mm[0:2]).tolist(),  
        "pcomponent_random":    np.transpose(pcomponent_random[0:2]).tolist(),  
        "pcomponent_strata":    np.transpose(pcomponent_strata[0:2]).tolist()
        }

    return data

#   Task 3(ii): MDS calculations 
#   for Euclidean
metric_type =   'euclidean'
mds_euclidean_mm    =   task3_get_MDS_data(df_mm,metric_type)
mds_euclidean_random    =   task3_get_MDS_data(df_random,metric_type)
mds_euclidean_strata    =   task3_get_MDS_data(df_strata,metric_type)

@app.route("/task3_MDS_Euclidean")
def get_task3_MDS_Euclidean():

    data = {"mds_euclidean_mm":    mds_euclidean_mm,  
        "mds_euclidean_random":    mds_euclidean_random,  
        "mds_euclidean_strata":    mds_euclidean_strata
        }

    return data

#   for Correlation    
metric_type =   'correlation'
mds_correlation_mm    =   task3_get_MDS_data(df_mm,metric_type)
mds_correlation_random    =   task3_get_MDS_data(df_random,metric_type)
mds_correlation_strata    =   task3_get_MDS_data(df_strata,metric_type)

print("org",min(mds_correlation_mm),max(mds_correlation_mm))
print("random",min(mds_correlation_random),max(mds_correlation_random))
print("strata",min(mds_correlation_strata),max(mds_correlation_strata))

@app.route("/task3_MDS_Correlation")
def get_task3_MDS_Correlation():

    data = {"mds_correlation_mm":    mds_correlation_mm,  
        "mds_correlation_random":    mds_correlation_random,  
        "mds_correlation_strata":    mds_correlation_strata
        }

    return data

#   Task 3(iii):     visualize the scatterplot matrix of the three highest PCA loaded attributes 
top3_attr_data_mm  = get_top3_pca_atttr_data(df_mm,colnames,top3_attr_mm)
top3_attr_data_random  = get_top3_pca_atttr_data(df_random,colnames,top3_attr_random)
top3_attr_data_strata  = get_top3_pca_atttr_data(df_strata,colnames,top3_attr_strata)


@app.route("/task3_ScatterPlotMatrix")
def get_task3_ScatterPlotMatrix():

    data = {"top3_attr_data_mm":    top3_attr_data_mm,  
        "top3_attr_data_random":    top3_attr_data_random,  
        "top3_attr_data_strata":    top3_attr_data_strata,
        }

    return data

if __name__ == "__main__":
    app.run(debug=True)
